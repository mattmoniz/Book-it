class Api::V1::NytbookslistsController < ApplicationController
    protect_from_forgery with: :null_session

  def index
    nyt_books_genre_names_url = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key="
    nyt_books_genre_names_response = Faraday.get("#{nyt_books_genre_names_url}#{ENV["NY_TIMES_BOOKS_API_KEY"]}")
    nyt_books_genre_names_parsed_response = JSON.parse(nyt_books_genre_names_response.body)
    genre_lists=[]
    nyt_books_genre_names_parsed_response["results"].each do |book_genre_info|
      book_genre={}
      book_genre[:list_name] = book_genre_info["list_name"]
      book_genre[:display_name] = book_genre_info["display_name"]
      book_genre[:list_name_encoded] = book_genre_info["list_name_encoded"]
      book_genre[:oldest_published_date] = book_genre_info["oldest_published_date"]
      book_genre[:newest_published_date] = book_genre_info["newest_published_date"]
      book_genre[:updated] = book_genre_info["updated"]

      genre_lists << book_genre
    end
    render json: genre_lists

    end


    def selectlist
      user=current_user

      google_base_url = "https://www.googleapis.com/books/v1/volumes"
      google_response = Faraday.get("#{google_base_url}/#{params["id"]}?key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
      google_parsed_response = JSON.parse(google_response.body)
      binding.pry


      nyt_books_list_selected_url = "https://api.nytimes.com/svc/books/v3/lists/current/"
      list_query = params['selectedString']
      nyt_books_list_selected_response = Faraday.get("#{nyt_books_list_selected_url}#{list_query}.json?api-key=#{ENV["NY_TIMES_BOOKS_API_KEY"]}")
      nyt_books_list_selected_parsed_response = JSON.parse(nyt_books_list_selected_response.body)
      book_lists=[]

      nyt_books_list_selected_parsed_response["results"]["books"].each do |book_list_info|
        book_info={}
        book_info[:title] = book_list_info["title"]
        book_info[:author] = book_list_info["author"]
        book_info[:book_image] = book_list_info["book_image"]
        book_info[:isbn] = book_list_info["primary_isbn13"]
        book_info[:rank] = book_list_info["rank"]
        book_info[:rank_last_week] = book_list_info["rank_last_week"]
        book_info[:weeks_on_list] = book_list_info["weeks_on_list"]
        book_info[:description] = book_list_info["description"]

        book_lists << book_info

      end
      render json: book_lists
    end
  end
