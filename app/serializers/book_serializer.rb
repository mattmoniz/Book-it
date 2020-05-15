class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :authors, :description, :isbn, :img_url, :user, :published_date, :page_count, :book_category, :book_id_google_books, :nyt_book_review

  has_many :libraries

end
