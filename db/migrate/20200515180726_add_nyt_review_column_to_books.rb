class AddNytReviewColumnToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :nyt_book_review, :string
  end
end
