class Api::V1::LibrariesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  protect_from_forgery unless: -> { request.format.json? }


  def create
      book = Book.new(book_params)
      if book.save
          render json: { book: book }
      else
          render json: { error: book.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def destroy
      book = Book.find(params[:id])
      book.destroy
      render json: {}, status: :no_content
  end

private
  def book_params
    params.require(:book).permit(:title, :authors, :isbn, :bookCover, :description, :user_id, :id)
  end


end
