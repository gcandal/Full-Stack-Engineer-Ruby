class MarvelApiClient
  PAGE_OFFSET = 20
  MAX_CHARACTERS_LIMIT = 10
  BASE_URL = ENV['BASE_URL']
  PRIVATE_KEY = ENV['PRIVATE_KEY']
  PUBLIC_KEY = ENV['PUBLIC_KEY']

  def self.get(page, character_prefix)
    extra_params = character_prefix.length > 0 ? "characters=#{get_character_ids character_prefix}" : ''
    url = build_url 'comics', page, extra_params
    response = HTTParty.get(url).parsed_response
    response['data']['results'].map { |comic| wrap_comic comic }
  end

  def self.get_character_ids(character_prefix)
    url = build_url 'characters', 0, "nameStartsWith=#{character_prefix}&limit=#{MAX_CHARACTERS_LIMIT}"
    response = HTTParty.get(url).parsed_response
    response['data']['results'].map do |character| character['id'] end.join(',')
  end

  def self.build_url(endpoint, page, extra_params)
    timestamp = Time.new.to_i.to_s
    hash = build_hash timestamp
    "#{BASE_URL}#{endpoint}?ts=#{timestamp}&apikey=#{PUBLIC_KEY}&hash=#{hash}&offset=#{page * PAGE_OFFSET}&#{extra_params}&limit=#{PAGE_OFFSET}"
  end

  def self.build_hash(timestamp)
    Digest::MD5.hexdigest("#{timestamp}#{PRIVATE_KEY}#{PUBLIC_KEY}")
  end

  def self.wrap_comic(comic)
    {
        id: comic['id'],
        title: comic['title'],
        issueNr: comic['issueNumber']? comic['issueNumber'] : 0,
        year: get_comic_year(comic),
        imageUrl: "#{comic['thumbnail']['path']}.#{comic['thumbnail']['extension']}",
        liked: Comic.liked?(comic['id'])
    }
  end

  def self.get_comic_year(comic)
    foc_date = comic['dates'].select do |date|
      date['type'] == 'focDate'
    end[0]['date']
    foc_date.slice(0, 4).to_i
  end

  private_class_method :get_character_ids, :build_hash, :build_url, :wrap_comic, :get_comic_year
end