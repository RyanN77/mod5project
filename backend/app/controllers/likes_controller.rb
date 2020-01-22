class LikesController < ApplicationController

    def index 
        @likes = Like.all
        render json: @likes
    end

    def create 
        @like = Like.find_or_create_by(like_params)
        render json: @like, status: :created, location: @like
    end

    def destroy
        @like = Like.find(params[:id])
        @like.destroy
    end
    
    private
    def like_params
        params.require(:like).permit(:user_id, :review_id, :upvote, :downvote)
    end

end