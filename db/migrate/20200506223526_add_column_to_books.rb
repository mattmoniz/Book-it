class AddColumnToBooks < ActiveRecord::Migration[5.2]
  def change
        add_column :books, :img_url, :string
  end
end
