class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :isbn, :img_url, :user, :published_date, :page_count, :book_category

  has_many :libraries

end
