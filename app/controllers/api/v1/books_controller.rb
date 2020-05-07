class Api::V1::BooksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    books=[]

    base_url = "https://www.googleapis.com/books/v1/volumes"
    num = "5"
    query = "android"
    response = Faraday.get("#{base_url}?&maxResults=#{num}&q=#{query}&key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
    parsed_response = JSON.parse(response.body)

    parsed_response["items"].each do |book|

      book_info = {}

      book_info[:title] = book["volumeInfo"]["title"]
      book_info[:description] = book["volumeInfo"]["description"]
      book_info[:isbn] = book["volumeInfo"]["industryIdentifiers"][0]["identifier"]
      book_info[:img_urls] = book["volumeInfo"]["imageLinks"]["thumbnail"] if (book["volumeInfo"]["imageLinks"].present?)
      # binding.pry
      allAuthors=""
       book["volumeInfo"]["authors"].each do |author|
         allAuthors += " " +author
       end

      book_info[:authors] = allAuthors
      books << book_info
    end
    # binding.pry
  render json: books

  end
end
