class Api::V1::BooksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    title=[]
    image_urls = []
    authors=[]
    description=[]
    isbn=[]

    base_url = "https://www.googleapis.com/books/v1/volumes"
    num = "40"
    query = "llama llama Red Pajama"
    response = Faraday.get("#{base_url}?&maxResults=#{num}&q=#{query}&key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
    parsed_response = JSON.parse(response.body)

    parsed_response["items"].each do |book|

      if book["volumeInfo"]["imageLinks"].present?
        image_urls << book["volumeInfo"]["imageLinks"]["thumbnail"]
      end

      title << book["volumeInfo"]["title"]
      authors << book["volumeInfo"]["authors"][0]
      description << book["volumeInfo"]["description"]

      book["volumeInfo"]["industryIdentifiers"].each do |isbnID|
        if isbnID["type"] == "ISBN_13"
          isbn << isbnID["identifier"]
        end
      end

    end

  render json: {
      title: title,
      authors: authors,
      description: description,
      image_urls: image_urls,
      isbn: isbn
    }

  end
end
