class Api::V1::NytbookslistsController < ApplicationController
  def index


    # google_base_url = "https://www.googleapis.com/books/v1/volumes"
    # google_response = Faraday.get("#{google_base_url}/#{params["id"]}?key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
    # google_parsed_response = JSON.parse(google_response.body)
    #
    # nyt_books_base_url = "https://api.nytimes.com/svc/books/v3/reviews.json?isbn="
    # nyt_books_isbn = google_parsed_response["volumeInfo"]["industryIdentifiers"][0]["identifier"]
    # nyt_books_response = Faraday.get("#{nyt_books_base_url}#{nyt_books_isbn}&api-key=#{ENV["NY_TIMES_BOOKS_API_KEY"]}")
    # nyt_books_parsed_response = JSON.parse(nyt_books_response.body)
    nyt_books_list_names_url = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key="
    nyt_books_list_names_response = Faraday.get("#{nyt_books_list_names_url}#{ENV["NY_TIMES_BOOKS_API_KEY"]}")
    nyt_books_list_names_parsed_response = JSON.parse(nyt_books_list_names_response.body)
    book_lists=[]
    nyt_books_list_names_parsed_response["results"].each do |book_list_info|
      book_list={}
      book_list[:list_name] = book_list_info["list_name"]
      book_list[:display_name] = book_list_info["display_name"]
      book_list[:list_name_encoded] = book_list_info["list_name_encoded"]
      book_list[:oldest_published_date] = book_list_info["oldest_published_date"]
      book_list[:newest_published_date] = book_list_info["newest_published_date"]
      book_list[:updated] = book_list_info["updated"]

      book_lists << book_list
    end
    render json: book_lists

    end


  end
