class NytimeslistController < ApplicationController
  def index
    user=current_user

    google_base_url = "https://www.googleapis.com/books/v1/volumes"
    google_response = Faraday.get("#{google_base_url}/#{params["id"]}?key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
    google_parsed_response = JSON.parse(google_response.body)

    nyt_books_base_url = "https://api.nytimes.com/svc/books/v3/reviews.json?isbn="
    nyt_books_isbn = google_parsed_response["volumeInfo"]["industryIdentifiers"][0]["identifier"]
    nyt_books_response = Faraday.get("#{nyt_books_base_url}#{nyt_books_isbn}&api-key=#{ENV["NY_TIMES_BOOKS_API_KEY"]}")
    nyt_books_parsed_response = JSON.parse(nyt_books_response.body)

    nyt_books_list_names_url = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key="
    nyt_books_list_names_response = Faraday.get("#{nyt_books_list_names_url}#{ENV["NY_TIMES_BOOKS_API_KEY"]}")
    debugger

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

                    nyt_book_review: nyt_books_parsed_response["results"][0]["url"]

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

                  nyt_book_review: "The New York Times has not reviewed this book."

                  }
      end

end
