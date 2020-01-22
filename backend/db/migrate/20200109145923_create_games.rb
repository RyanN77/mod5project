class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :game_reference
      t.string :name
      t.string :summary
      t.integer :follows
      t.integer :rating
      t.string :cover_url

      t.timestamps
    end
  end
end
