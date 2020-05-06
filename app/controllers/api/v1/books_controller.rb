class Api::V1::BooksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    image_urls = []
    base_url = "https://www.googleapis.com/books/v1/volumes"
    num = "40"
    query = "Android"
    response = Faraday.get("#{base_url}?&maxResults=#{num}&q=#{query}&key=#{ENV["GOOGLE_BOOKS_API_KEY"]}")
    parsed_response = JSON.parse(response.body)

    parsed_response["items"].each do |book|
      if book["volumeInfo"]["imageLinks"].present?
        image_urls << book["volumeInfo"]["imageLinks"]["thumbnail"]
      end
    end
    render json: image_urls
  end
end
