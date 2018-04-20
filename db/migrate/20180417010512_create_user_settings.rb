class CreateUserSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :user_settings do |t|
      t.integer :admin_id
      t.text :text_message

      t.timestamps
    end
  end
end
