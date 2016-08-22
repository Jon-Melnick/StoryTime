class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :requester_id, null: false
      t.integer :receiver_id, null: false
      t.string :status, default: 'pending', null: false

      t.timestamps null: false
    end
    add_index :friendships, [:requester_id, :receiver_id], unique: true
  end
end
