class Cause < ActiveRecord::Base
  validates :name, presence: true
  validates :description, presence: true

  has_many :donations
end
