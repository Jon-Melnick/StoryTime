class CreateWriters < ActiveRecord::Migration
  def change
    create_table :writers do |t|
      t.integer :user_id, null: false
      t.integer :story_id, null: false
      t.string :hand, array: true, default: []
      t.timestamps null: false
    end
    add_index :writers, :user_id
    add_index :writers, :story_id
    add_index :writers, [:user_id, :story_id], unique: true
  end
end
