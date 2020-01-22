class ReviewsController < ApplicationController

    def index 
        @reviews = Review.all
        render json: @reviews
    end

    def create 
        @review = Review.new(review_params)
        if @review.save
            render json: @review, status: :created, location: @review
        else
            render json: @review.errors, status: :unprocessable_entity
        end
    end

    def filter
        average = 0
        @reviews = Review.where(:game_id => params[:id])
        
        if @reviews.length != 0 
            @reviews.map do |review|
                average += review.rating
            end
            average = average/@reviews.length
        end
        
        userhash = @reviews.map do |review|
            {
                review_id: review.id,
                user_id: review.user_id,
                img_url: User.find(review.user_id).img_url,
                username: User.find(review.user_id).username,
                rating: review.rating,
                content: review.content,
                likes: review.likes,
            }
        end

        render json: {
            userhash: userhash,
            total_reviews: @reviews.length,
            total_rating: average
        }
    end

    
    private
    def review_params
        params.require(:review).permit(:user_id, :game_id, :rating, :content, :likes, :dislikes)
    end

end