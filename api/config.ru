require File.expand_path('../config/environment', __FILE__)
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :put]
  end
end

run Marvel::API