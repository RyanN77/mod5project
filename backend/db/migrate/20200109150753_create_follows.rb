class CreateFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :follows do |t|
      t.belongs_to :user
      t.belongs_to :game

      t.timestamps
    end
  end
end
