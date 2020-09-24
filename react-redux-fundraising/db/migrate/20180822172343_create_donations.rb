class CreateDonations < ActiveRecord::Migration[5.2]
  def change
    create_table :donations do |t|
      t.string :name, null: false
      t.string :comment
      t.integer :amount, null: false
      t.belongs_to :cause

      t.timestamps null: false
    end
  end
end
