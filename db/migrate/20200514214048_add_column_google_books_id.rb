class AddColumnGoogleBooksId < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :book_id_google_books, :string
  end
end
