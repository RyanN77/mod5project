# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.destroy_all
User.destroy_all
Review.destroy_all
Follow.destroy_all 
Like.destroy_all

require 'json'
require 'rest-client'
require 'net/https'

# videos, screenshots.*  | USE THIS FOR FRONT END FETCHING FOR IMGS

key = ""
http = Net::HTTP.new('api-v3.igdb.com',443)
http.use_ssl = true
game = Net::HTTP::Post.new(URI('https://api-v3.igdb.com/games'), {'user-key' => key}) #insert key here
game.body = "fields name, summary, cover.*; where aggregated_rating_count > 0; sort aggregated_rating_count desc; limit 500;"
gameList = http.request(game).body
parsedGameList = JSON.parse(gameList)

parsedGameList.each do |game|

    Game.create(
        game_reference: game["id"],
        name: game["name"],
        summary: game["summary"],
        cover_url: "https:" + game["cover"]["url"],
    )
    
end
