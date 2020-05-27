class Api::V1::BooksController < ApplicationController
  require 'sanitize'
  before_action :authenticate_user!, except: [:index]
  protect_from_forgery unless: -> { request.format.json? }

  def index

    user=current_user
    render json: {
      user_id: user.id,
      user_email: user.email,
      user_books: user.books
    }

  end

  def create
    book = Book.new(book_params)
    book.save
    if !current_user.nil?
      book.users << current_user
    end

    if book.save
      render json: {book: book}
    else
      render json: {error: book.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def show
    user=current_user

    google_base_url = "https://www.googleapis.com/books/v1/volumes"
    google_response = Faraday.get("#{google_base_url}/#{params["id"]}?key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
    google_parsed_response = JSON.parse(google_response.body)

    nyt_books_base_url = "https://api.nytimes.com/svc/books/v3/reviews.json?isbn="
    nyt_books_isbn = google_parsed_response["volumeInfo"]["industryIdentifiers"][0]["identifier"]
    nyt_books_response = Faraday.get("#{nyt_books_base_url}#{nyt_books_isbn}&api-key=#{ENV["NY_TIMES_BOOKS_API_KEY"]}")
    nyt_books_parsed_response = JSON.parse(nyt_books_response.body)

    goodreads_isbn = google_parsed_response["volumeInfo"]["industryIdentifiers"][0]["identifier"]
    goodreads_base_url = "https://www.goodreads.com/book/isbn/"
    goodreads_response = Faraday.get("#{goodreads_base_url}#{goodreads_isbn}?format=json&user_id=114918137")
    goodreads_parsed_response = JSON.parse(goodreads_response.body)
    goodreads_iframe_src="https://www.goodreads.com/api/reviews_widget_iframe?did=DEVELOPER_ID&amp;format=html&amp;isbn=#{goodreads_isbn}&amp;links=660&amp;review_back=fff&amp;stars=000&amp;text=000"
    if (nyt_books_parsed_response["results"][0].present?)
     render json: {
                    id: google_parsed_response["id"],
                    title: google_parsed_response["volumeInfo"]["title"],
                    book_id_google_books: google_parsed_response["id"],
                    isbn: google_parsed_response["volumeInfo"]["industryIdentifiers"][0]["identifier"],
                    img_url: google_parsed_response["volumeInfo"]["imageLinks"]["thumbnail"],
                    description: Sanitize.fragment(google_parsed_response["volumeInfo"]["description"], Sanitize::Config::RELAXED).gsub('<br>', ''),
                    published_date: google_parsed_response["volumeInfo"]["publishedDate"],
                    page_count: google_parsed_response["volumeInfo"]["pageCount"][0],
                    book_category: google_parsed_response["volumeInfo"]["categories"][0],
                    authors: google_parsed_response["volumeInfo"]["authors"].join(", "),
                    user_id: user.id,
                    user_email: user.email,

                    nyt_book_review: nyt_books_parsed_response["results"][0]["url"],

                    goodreads_reviews: goodreads_parsed_response["reviews_widget"],
                    goodreads_iframe_src: goodreads_iframe_src

                    }
      else
      render json: {
                  id: google_parsed_response["id"],
                  title: google_parsed_response["volumeInfo"]["title"],
                  book_id_google_books: google_parsed_response["id"],
                  isbn: google_parsed_response["volumeInfo"]["industryIdentifiers"][0]["identifier"],
                  img_url: google_parsed_response["volumeInfo"]["imageLinks"]["thumbnail"],
                  description: Sanitize.fragment(google_parsed_response["volumeInfo"]["description"], Sanitize::Config::RELAXED).gsub('<br>', ''),
                  published_date: google_parsed_response["volumeInfo"]["publishedDate"],
                  page_count: google_parsed_response["volumeInfo"]["pageCount"][0],
                  book_category: google_parsed_response["volumeInfo"]["categories"][0],
                  authors: google_parsed_response["volumeInfo"]["authors"].join(", "),

                  user_id: user.id,
                  user_email: user.email,

                  nyt_book_review: "The New York Times has not reviewed this book.",
                  goodreads_reviews: goodreads_parsed_response["reviews_widget"],
                  goodreads_iframe_src: goodreads_iframe_src
                }
      end

  end




def search
  books=[]
  base_url = "https://www.googleapis.com/books/v1/volumes"
  num = "40"
  query = params['searchString']
  response = Faraday.get("#{base_url}?&maxResults=#{num}&q=#{query}&key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
  parsed_response = JSON.parse(response.body)
  parsed_response["items"].each do |book|


    book_info = {}
    book_info[:id] = book["id"]
    book_info[:book_id_google_books] = parsed_response["id"],
    book_info[:title] = book["volumeInfo"]["title"]
    book_info[:description] = Sanitize.fragment(book["volumeInfo"]["description"], Sanitize::Config::RELAXED).gsub('<br>', ' '),
    book_info[:isbn] = book["volumeInfo"]["industryIdentifiers"][0]["identifier"] if (book["volumeInfo"]["industryIdentifiers"].present?)
    book_info[:img_url] = book["volumeInfo"]["imageLinks"]["thumbnail"] if (book["volumeInfo"]["imageLinks"].present?)
    book_info[:published_date] = book["volumeInfo"]["publishedDate"] if (book["volumeInfo"]["publishedDate"].present?)
    book_info[:page_count] = book["volumeInfo"]["pageCount"] if (book["volumeInfo"]["pageCount"].present?)
    book_info[:book_category] = book["volumeInfo"]["categories"][0] if (book["volumeInfo"]["categories"].present?)
# binding.pry

    allAuthors=""
    if book["volumeInfo"]["authors"].present?
     book["volumeInfo"]["authors"].each.with_index do |author, index|
       if (index+1 == book["volumeInfo"]["authors"].length)
         allAuthors += author+" "
       else
         allAuthors += author+", "
       end
     end
     book_info[:authors] = allAuthors
    end

    books << book_info

  end
  render json: books

  end




  def destroy
    library = Library.where(book: params[:id], user: current_user)[0]
    Library.find(library.id).delete

    render json: User.find(current_user.id)
  end



  protected
  def book_params
    params.require(:book).permit(:title, :authors, :img_url ,:description ,:isbn, :user_id, :published_date, :page_count, :book_category, :book_id_google_books, :nyt_book_review)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

end
