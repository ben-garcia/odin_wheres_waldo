class CreateScores < ActiveRecord::Migration[5.1]
  def change
    create_table :scores do |t|
      t.integer :number
      t.string :player_name
      t.integer :puzzle_id

      t.timestamps
    end
  end
end
