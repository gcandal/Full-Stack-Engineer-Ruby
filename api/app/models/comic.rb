require 'time'
require 'digest/md5'
require 'httparty'

class Comic
  include Mongoid::Document

  field :id, type: Integer
  field :liked, type: Boolean

  def self.liked? id
    Comic.where(id: id, liked: true).exists?
  end
end