class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.integer :user_id, null: false
      t.integer :story_id, null: false
      t.text :body, null: false
      t.hstore :seen, default: {}

      t.timestamps null: false
    end
    add_index :sections, :user_id
    add_index :sections, :story_id
  end
end
