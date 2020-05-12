class AddColumnsToBooksTable < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :published_date, :string
    add_column :books, :page_count, :string
    add_column :books, :book_category, :string
  end
end
