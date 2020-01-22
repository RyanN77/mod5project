class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.belongs_to :user
      t.belongs_to :game
      t.string :content
      t.integer :rating
      t.integer :likes 
      t.integer :dislikes

      t.timestamps
    end
  end
end
