class Api::V1::BooksController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    user=current_user
    render json: {
      user_id: user.id,
      user_email: user.email
    }

  end

  def show
    # binding.pry
    base_url = "https://www.googleapis.com/books/v1/volumes"
    response = Faraday.get("#{base_url}/#{params["id"]}?key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
    parsed_response = JSON.parse(response.body)



     render json: { id: parsed_response["id"],
                    title: parsed_response["volumeInfo"]["title"],
                    authors: parsed_response["volumeInfo"]["authors"],
                    idbn: parsed_response["volumeInfo"]["industryIdentifiers"][0]["identifier"],
                    img_url: parsed_response["volumeInfo"]["imageLinks"]["thumbnail"],
                    description: parsed_response["volumeInfo"]["description"]
                    }
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
    book_info[:title] = book["volumeInfo"]["title"]
    book_info[:description] = book["volumeInfo"]["description"]
    book_info[:isbn] = book["volumeInfo"]["industryIdentifiers"][0]["identifier"] if book["volumeInfo"]["industryIdentifiers"].present?
    book_info[:img_url] = book["volumeInfo"]["imageLinks"]["thumbnail"] if (book["volumeInfo"]["imageLinks"].present?)


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



  protected
  def product_params
    params.require(:book).permit(:title, :authors)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

end
