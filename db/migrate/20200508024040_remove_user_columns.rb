class RemoveUserColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :first_name, :string
    remove_column :users, :last_name, :string
    remove_column :users, :user_name, :string, null: false
    remove_column :users, :admin, :boolean, null: false, default: false
    
  end
end
