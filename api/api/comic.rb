module Marvel
  class ComicAPI < Grape::API
    resource :comics do
      desc 'Get a list of comics'
      params do
        optional :page, type: Integer
        optional :character, type: String
      end
      get do
        page = params[:page]? params[:page] : 0
        character = params[:character]? params[:character] : ''
        MarvelApiClient.get page, character
      end
    end

    resource :comic do
      route_param :id do
        desc 'Mark a comic as liked'
        put 'like' do
          comic = Comic.find_or_create_by(id: params[:id].to_i)
          comic.update_attributes(liked: true)
        end
        desc 'Unmark a comic as liked'
        put 'unlike' do
          comic = Comic.find_or_create_by(id: params[:id].to_i)
          comic.update_attributes(liked: true)
        end
      end
    end
  end
end