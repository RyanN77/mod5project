class CreateLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.belongs_to :user
      t.belongs_to :review
      t.boolean :upvote
      t.boolean :downvote

      t.timestamps
    end
  end
end
