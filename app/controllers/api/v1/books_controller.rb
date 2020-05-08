class Api::V1::BooksController < ApplicationController
  # before_action :authenticate_user!, except: [:index, :show]
  protect_from_forgery unless: -> { request.format.json? }

  def index

  end

  def show
    # binding.pry
    # render json: Book.find(params[:id])
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


end
