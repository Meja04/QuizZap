package com.quizzap.backend.config;

import java.util.Arrays;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.quizzap.backend.entity.Category;
import com.quizzap.backend.entity.Question;
import com.quizzap.backend.entity.Score;
import com.quizzap.backend.repository.CategoryRepository;
import com.quizzap.backend.repository.QuestionRepository;
import com.quizzap.backend.repository.ScoreRepository;

@Component
public class DataInitializer implements CommandLineRunner {

  private final CategoryRepository categoryRepository;
  private final QuestionRepository questionRepository;
  private final ScoreRepository scoreRepository;

  public DataInitializer(CategoryRepository categoryRepository, QuestionRepository questionRepository,
      ScoreRepository scoreRepository) {
    this.categoryRepository = categoryRepository;
    this.questionRepository = questionRepository;
    this.scoreRepository = scoreRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    if (categoryRepository.count() == 0) {
      categoryRepository
          .save(new Category(null, "videogames", "If you love video games, this is the right category for you",
              "sports_esports"));
      categoryRepository
          .save(new Category(null, "cinema", "Find out how much you know about movies and actors", "movie"));
      categoryRepository
          .save(new Category(null, "geography", "Explore the world by answering geography questions", "public"));
      categoryRepository
          .save(new Category(null, "history", "Travel through time with questions about world history", "history_edu"));
      categoryRepository
          .save(new Category(null, "art", "Test your knowledge about painting and artistic movements", "palette"));
      categoryRepository
          .save(new Category(null, "science", "Challenge your scientific knowledge in various fields", "science"));
    }

    if (questionRepository.count() == 0) {
      // VIDEOGAMES
      questionRepository.save(new Question(null, "Which game features the character Mugman?",
          Arrays.asList("Cuphead", "Undertale", "Hollow Knight", "Celeste"), 0, "videogames"));
      questionRepository.save(new Question(null, "What is the best-selling video game of all time?",
          Arrays.asList("Minecraft", "GTA V", "Tetris", "Wii Sports"), 0, "videogames"));
      questionRepository.save(new Question(null, "Which company developed The Legend of Zelda?",
          Arrays.asList("Sony", "Ubisoft", "Nintendo", "Sega"), 2, "videogames"));
      questionRepository.save(new Question(null, "What year was the first PlayStation released?",
          Arrays.asList("1992", "1994", "1996", "1998"), 1, "videogames"));
      questionRepository.save(new Question(null,
          "In the Pokémon universe, what is the name of the electric-type Pokémon that evolves from Pikachu?",
          Arrays.asList("Pichu", "Raichu", "Elekid", "Zapdos"), 1, "videogames"));
      questionRepository.save(new Question(null, "What is the main currency in World of Warcraft?",
          Arrays.asList("Gil", "Gold", "Credits", "Coins"), 1, "videogames"));
      questionRepository.save(new Question(null, "Which game popularized the battle royale genre?",
          Arrays.asList("Fortnite", "PUBG", "Apex Legends", "Call of Duty Warzone"), 0, "videogames"));
      questionRepository.save(new Question(null, "What is the name of the protagonist in Red Dead Redemption 2?",
          Arrays.asList("John Marston", "Arthur Morgan", "Dutch van der Linde", "Micah Bell"), 1, "videogames"));
      questionRepository.save(new Question(null, "Which console has the highest sales of all time?",
          Arrays.asList("PlayStation 2", "Nintendo DS", "Xbox 360", "PlayStation 4"), 0, "videogames"));
      questionRepository.save(new Question(null, "In Overwatch, what is the ultimate ability of Tracer called?",
          Arrays.asList("Pulse Bomb", "Graviton Surge", "Self-Destruct", "Rocket Barrage"), 0, "videogames"));
      questionRepository.save(new Question(null, "Which of these games is a MMORPG?",
          Arrays.asList("The Witcher 3", "Final Fantasy XIV", "Dark Souls", "Skyrim"), 1, "videogames"));
      questionRepository.save(new Question(null, "How many games are in the Uncharted series?",
          Arrays.asList("3", "4", "5", "6"), 2, "videogames"));
      questionRepository.save(new Question(null, "Which game studio developed The Elder Scrolls V: Skyrim?",
          Arrays.asList("CD Projekt Red", "Bethesda", "BioWare", "Ubisoft"), 1, "videogames"));
      questionRepository.save(new Question(null, "In Minecraft, what is the Nether?",
          Arrays.asList("A type of ore", "A hostile dimension", "A crafting station", "A rare mob"), 1, "videogames"));
      questionRepository.save(new Question(null, "Which fighting game features characters like Ryu and Ken?",
          Arrays.asList("Tekken", "Mortal Kombat", "Street Fighter", "Dead or Alive"), 2, "videogames"));
      questionRepository.save(new Question(null, "What is the name of the virus in the Last of Us?",
          Arrays.asList("Cordyceps", "Z-Virus", "T-Virus", "Fungus"), 0, "videogames"));
      questionRepository.save(new Question(null, "Which game features a character named Geralt of Rivia?",
          Arrays.asList("Dragon Age", "The Witcher", "Dark Souls", "Elder Scrolls"), 1, "videogames"));
      questionRepository.save(new Question(null, "What is the main protagonist's name in the Assassin's Creed series?",
          Arrays.asList("Ezio", "Altaïr", "Desmond", "There are multiple protagonists"), 3, "videogames"));
      questionRepository.save(new Question(null, "Which of these is NOT a real video game genre?",
          Arrays.asList("Souls-like", "Metroidvania", "Rogue-lite", "Platformer-shooter"), 3, "videogames"));
      questionRepository
          .save(new Question(null, "What is the name of the princess you must rescue in the Super Mario series?",
              Arrays.asList("Daisy", "Toad", "Zelda", "Peach"), 3, "videogames"));

      // CINEMA
      questionRepository.save(new Question(null, "Who directed the movie Inception?",
          Arrays.asList("Christopher Nolan", "Steven Spielberg", "James Cameron", "Martin Scorsese"), 0, "cinema"));
      questionRepository.save(new Question(null, "Which actor played Jack in Titanic?",
          Arrays.asList("Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Tom Cruise"), 0, "cinema"));
      questionRepository.save(new Question(null, "Which film won Best Picture at the 2020 Oscars?",
          Arrays.asList("1917", "Joker", "Parasite", "The Irishman"), 2, "cinema"));
      questionRepository.save(new Question(null, "Who played the role of Tony Stark in the Marvel Cinematic Universe?",
          Arrays.asList("Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"), 1, "cinema"));
      questionRepository
          .save(new Question(null, "What's the name of the protagonist alter ego in the movie The Matrix?",
              Arrays.asList("Neo", "Morpheus", "Trinity", "Agent Smith"), 0, "cinema"));
      questionRepository.save(new Question(null, "What was the first feature-length animated film?",
          Arrays.asList("Snow White and the Seven Dwarfs", "Fantasia", "Bambi", "Pinocchio"), 0, "cinema"));
      questionRepository.save(new Question(null,
          "Which director is known for his distinctive visual style and frequent collaborations with Johnny Depp?",
          Arrays.asList("Quentin Tarantino", "Wes Anderson", "David Fincher", "Tim Burton"), 3, "cinema"));
      questionRepository.save(new Question(null, "Which movie features the fictional sport of Quidditch?",
          Arrays.asList("The Lord of the Rings", "Eragon", "Harry Potter", "The Hunger Games"), 2, "cinema"));
      questionRepository.save(new Question(null, "What is the highest-grossing film of all time?",
          Arrays.asList("Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"), 1, "cinema"));
      questionRepository.save(new Question(null, "Which actress has won the most Academy Awards?",
          Arrays.asList("Meryl Streep", "Katharine Hepburn", "Ingrid Bergman", "Bette Davis"), 1, "cinema"));
      questionRepository.save(new Question(null, "Which movie features the character Mr. Fox?",
          Arrays.asList("Fantastic Mr. Fox", "The Fox and the Hound", "Zootopia", "The Secret Life of Pets"), 0,
          "cinema"));
      questionRepository.save(new Question(null, "Who directed the Star Wars original trilogy?",
          Arrays.asList("Steven Spielberg", "George Lucas", "Irvin Kershner", "J.J. Abrams"), 1, "cinema"));
      questionRepository.save(new Question(null, "Which movie is set in the dystopian city of Neo Tokyo?",
          Arrays.asList("Ghost in the Shell", "Akira", "Blade Runner", "The Matrix"), 1, "cinema"));
      questionRepository.save(new Question(null, "What is the name of the fictional theme park in Jurassic Park?",
          Arrays.asList("Isla Nublar", "Isla Sorna", "Jurassic World", "DinoLand"), 0, "cinema"));
      questionRepository.save(new Question(null, "Which actor played the Joker in The Dark Knight?",
          Arrays.asList("Jack Nicholson", "Heath Ledger", "Jared Leto", "Joaquin Phoenix"), 1, "cinema"));
      questionRepository.save(new Question(null, "What song is in the ending of the movie Fight Club?",
          Arrays.asList("Creep", "Hurt", "The Sound of Silence", "Where Is My Mind?"), 3, "cinema"));
      questionRepository
          .save(new Question(null, "What is the name of the hobbit played by Elijah Wood in Lord of the Rings?",
              Arrays.asList("Samwise", "Frodo", "Bilbo", "Pippin"), 1, "cinema"));
      questionRepository
          .save(new Question(null, "What is the name of the villain played by Alfred Molina in Spider-Man 2?",
              Arrays.asList("Doctor Octopus", "Green Goblin", "Venom", "Sandman"), 0, "cinema"));
      questionRepository.save(new Question(null, "What is the name of the protagonist in The Boy and the Heron?",
          Arrays.asList("Mahito", "Mitsuha", "Sōta", "Hayao"), 0, "cinema"));
      questionRepository.save(new Question(null, "Who directed the movie Pulp Fiction?",
          Arrays.asList("Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "David Fincher"), 1, "cinema"));

      // GEOGRAPHY
      questionRepository.save(new Question(null, "What is the capital of Australia?",
          Arrays.asList("Sydney", "Melbourne", "Canberra", "Perth"), 2, "geography"));
      questionRepository.save(new Question(null, "Which river is the longest in the world?",
          Arrays.asList("Nile", "Amazon", "Yangtze", "Mississippi"), 0, "geography"));
      questionRepository.save(new Question(null, "Mount Everest is located in which mountain range?",
          Arrays.asList("Andes", "Alps", "Himalayas", "Rockies"), 2, "geography"));
      questionRepository.save(new Question(null, "Which country has the most natural lakes?",
          Arrays.asList("Russia", "Canada", "Kenya", "Finland"), 1, "geography"));
      questionRepository.save(new Question(null, "What is the smallest country in the world?",
          Arrays.asList("Monaco", "Vatican City", "San Marino", "Liechtenstein"), 1, "geography"));
      questionRepository.save(new Question(null, "Which desert is the largest in the world?",
          Arrays.asList("Sahara", "Arabian", "Gobi", "Antarctic"), 3, "geography"));
      questionRepository.save(new Question(null, "The Great Barrier Reef is located off the coast of which country?",
          Arrays.asList("Brazil", "Mexico", "Australia", "Indonesia"), 2, "geography"));
      questionRepository.save(new Question(null, "Which of these countries is landlocked?",
          Arrays.asList("Uruguay", "Paraguay", "Chile", "Peru"), 1, "geography"));
      questionRepository.save(new Question(null, "What is the capital of Canada?",
          Arrays.asList("Toronto", "Vancouver", "Ottawa", "Montreal"), 2, "geography"));
      questionRepository.save(new Question(null, "Which continent contains the most countries?",
          Arrays.asList("Asia", "Africa", "Europe", "South America"), 1, "geography"));
      questionRepository.save(new Question(null, "Which US state is known as the Sunshine State?",
          Arrays.asList("California", "Florida", "Texas", "Arizona"), 1, "geography"));
      questionRepository.save(new Question(null, "Which country is shaped like a boot?",
          Arrays.asList("Greece", "Spain", "Portugal", "Italy"), 3, "geography"));
      questionRepository.save(new Question(null, "What is the longest mountain range in the world?",
          Arrays.asList("Rockies", "Andes", "Himalayas", "Alps"), 1, "geography"));
      questionRepository.save(new Question(null, "Which of these cities is NOT a national capital?",
          Arrays.asList("Sydney", "London", "Paris", "Tokyo"), 0, "geography"));
      questionRepository.save(new Question(null, "Which ocean is the largest?",
          Arrays.asList("Atlantic", "Indian", "Pacific", "Arctic"), 2, "geography"));
      questionRepository.save(new Question(null, "Which country has the longest coastline?",
          Arrays.asList("Russia", "Canada", "Australia", "USA"), 1, "geography"));
      questionRepository.save(new Question(null, "What is the capital of South Africa?",
          Arrays.asList("Johannesburg", "Cape Town", "Pretoria", "South Africa has three capitals"), 3, "geography"));
      questionRepository.save(new Question(null, "Which country is both in Europe and Asia?",
          Arrays.asList("Turkey", "Egypt", "Greece", "Ukraine"), 0, "geography"));
      questionRepository.save(new Question(null, "Which country is known as the Land of the Rising Sun?",
          Arrays.asList("Japan", "China", "Thailand", "South Korea"), 0, "geography"));
      questionRepository.save(new Question(null, "What is the most populous country in the world?",
          Arrays.asList("India", "USA", "China", "Russia"), 2, "geography"));

      // ART
      questionRepository.save(new Question(null, "Who painted the Mona Lisa?",
          Arrays.asList("Leonardo da Vinci", "Michelangelo", "Raffaello", "Caravaggio"), 0, "art"));
      questionRepository.save(new Question(null, "In which city is the Louvre Museum located?",
          Arrays.asList("Rome", "London", "Paris", "Madrid"), 2, "art"));
      questionRepository.save(new Question(null, "Which art movement is Salvador Dalí associated with?",
          Arrays.asList("Cubism", "Surrealism", "Impressionism", "Futurism"), 1, "art"));
      questionRepository.save(new Question(null, "Who painted The Starry Night?",
          Arrays.asList("Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Edvard Munch"), 1, "art"));
      questionRepository.save(new Question(null, "Which artist is known for his Campbell's Soup Cans artwork?",
          Arrays.asList("Andy Warhol", "Roy Lichtenstein", "Jackson Pollock", "Mark Rothko"), 0, "art"));
      questionRepository.save(new Question(null, "Which artist is famous for the sculpture David?",
          Arrays.asList("Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"), 1, "art"));
      questionRepository.save(new Question(null, "Which art movement is characterized by small dots of color?",
          Arrays.asList("Impressionism", "Pointillism", "Fauvism", "Expressionism"), 1, "art"));
      questionRepository.save(new Question(null, "Who painted the ceiling of the Sistine Chapel?",
          Arrays.asList("Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"), 1, "art"));
      questionRepository.save(new Question(null, "Which of these is NOT a primary color?",
          Arrays.asList("Red", "Blue", "Green", "Yellow"), 2, "art"));
      questionRepository.save(new Question(null,
          "Which artist is credited with inventing linear perspective in painting during the Renaissance?",
          Arrays.asList("Leonardo da Vinci", "Filippo Brunelleschi", "Sandro Botticelli", "Michelangelo"), 1, "art"));
      questionRepository.save(new Question(null, "Which artist cut off part of his own ear?",
          Arrays.asList("Pablo Picasso", "Vincent van Gogh", "Salvador Dalí", "Edvard Munch"), 1, "art"));
      questionRepository.save(
          new Question(null, "What is the name of the famous painting by Edvard Munch that depicts a figure screaming?",
              Arrays.asList("The Scream", "The Shout", "The Cry", "The Yell"), 0, "art"));
      questionRepository.save(new Question(null, "Which art movement was founded by Pablo Picasso and Georges Braque?",
          Arrays.asList("Surrealism", "Cubism", "Dadaism", "Futurism"), 1, "art"));
      questionRepository.save(new Question(null, "What is the main medium used in watercolor painting?",
          Arrays.asList("Oil", "Acrylic", "Water-soluble pigments", "Charcoal"), 2, "art"));
      questionRepository.save(new Question(null, "Which famous art museum is located in Madrid?",
          Arrays.asList("The Louvre", "The Prado", "The Tate", "The Uffizi"), 1, "art"));
      questionRepository.save(new Question(null, "Who created the sculpture The Thinker?",
          Arrays.asList("Michelangelo", "Auguste Rodin", "Donatello", "Alberto Giacometti"), 1, "art"));
      questionRepository.save(new Question(null, "Which art movement is characterized by dream-like scenes?",
          Arrays.asList("Impressionism", "Surrealism", "Realism", "Baroque"), 1, "art"));
      questionRepository.save(new Question(null,
          "What is the name of the famous painting by Grant Wood featuring a farmer and his daughter?",
          Arrays.asList("American Gothic", "The Farmers", "Rural Life", "Midwest Portrait"), 0, "art"));
      questionRepository.save(new Question(null, "Which artist is known for his drip paintings?",
          Arrays.asList("Jackson Pollock", "Willem de Kooning", "Mark Rothko", "Andy Warhol"), 0, "art"));
      questionRepository
          .save(new Question(null, "What is the name of the famous ancient Greek statue depicting the goddess of love?",
              Arrays.asList("Venus de Milo", "Winged Victory", "Discobolus", "Laocoön"), 0, "art"));

      // HISTORY
      questionRepository.save(new Question(null, "In which year did World War II end?",
          Arrays.asList("1945", "1939", "1950", "1941"), 0, "history"));
      questionRepository.save(new Question(null, "Who was the first emperor of Rome?",
          Arrays.asList("Julius Caesar", "Nero", "Augustus", "Tiberius"), 2, "history"));
      questionRepository.save(new Question(null, "The Renaissance began in which country?",
          Arrays.asList("France", "Germany", "Italy", "England"), 2, "history"));
      questionRepository.save(new Question(null, "Who was the first president of the United States?",
          Arrays.asList("Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"), 2, "history"));
      questionRepository.save(new Question(null, "Which ancient civilization built the pyramids?",
          Arrays.asList("Greeks", "Romans", "Egyptians", "Vikings"), 2, "history"));
      questionRepository.save(new Question(null, "In which year did the Titanic sink?",
          Arrays.asList("1905", "1912", "1920", "1915"), 1, "history"));
      questionRepository.save(new Question(null, "Who wrote the Communist Manifesto?",
          Arrays.asList("Vladimir Lenin", "Karl Marx", "Joseph Stalin", "Friedrich Engels"), 1, "history"));
      questionRepository.save(new Question(null, "Which empire was ruled by Genghis Khan?",
          Arrays.asList("Ottoman", "Mongol", "Persian", "Roman"), 1, "history"));
      questionRepository.save(new Question(null, "What was the name of the ship that brought the Pilgrims to America?",
          Arrays.asList("Santa Maria", "Mayflower", "Pinta", "Niña"), 1, "history"));
      questionRepository.save(new Question(null, "Who discovered America in 1492?",
          Arrays.asList("Vasco da Gama", "Ferdinand Magellan", "James Cook", "Christopher Columbus"), 3, "history"));
      questionRepository
          .save(new Question(null, "Which war was fought between the North and South in the United States?",
              Arrays.asList("Revolutionary War", "Civil War", "War of 1812", "World War I"), 1, "history"));
      questionRepository.save(new Question(null, "Who was the leader of Nazi Germany during World War II?",
          Arrays.asList("Benito Mussolini", "Adolf Hitler", "Joseph Stalin", "Winston Churchill"), 1, "history"));
      questionRepository.save(new Question(null, "Who was the first woman in space?",
          Arrays.asList("Valentina Tereshkova", "Sally Ride", "Mae Jemison", "Yuri Gagarin"), 0, "history"));
      questionRepository.save(new Question(null, "Who was known as the Maid of Orléans during the Hundred Years War?",
          Arrays.asList("Joan of Arc", "Catherine de Medici", "Eleanor of Aquitaine", "Marie Antoinette"), 0,
          "history"));
      questionRepository.save(new Question(null, "Which country was NOT part of the Axis powers in WWII?",
          Arrays.asList("Germany", "Italy", "Japan", "Russia"), 3, "history"));
      questionRepository.save(new Question(null, "Who was the first woman to win a Nobel Prize?",
          Arrays.asList("Marie Curie", "Mother Teresa", "Rosalind Franklin", "Florence Nightingale"), 0, "history"));
      questionRepository.save(new Question(null, "Which ancient civilization developed the concept of zero?",
          Arrays.asList("Greeks", "Romans", "Egyptians", "Indians"), 3, "history"));
      questionRepository
          .save(new Question(null, "What was the name of the first permanent English settlement in America?",
              Arrays.asList("Plymouth", "Jamestown", "Roanoke", "Boston"), 1, "history"));
      questionRepository.save(new Question(null, "Which revolution began in 1789?",
          Arrays.asList("American Revolution", "Industrial Revolution", "French Revolution", "Russian Revolution"), 2,
          "history"));
      questionRepository.save(new Question(null, "Who invented the printing press?",
          Arrays.asList("Leonardo da Vinci", "Galileo Galilei", "Johannes Gutenberg", "Isaac Newton"), 2, "history"));

      // SCIENCE
      questionRepository.save(new Question(null, "What is the largest planet in our Solar System?",
          Arrays.asList("Earth", "Jupiter", "Saturn", "Neptune"), 1, "science"));
      questionRepository.save(new Question(null, "How many planets are in the Solar System?",
          Arrays.asList("7", "8", "9", "10"), 1, "science"));
      questionRepository.save(new Question(null, "What gas do plants absorb from the atmosphere?",
          Arrays.asList("Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"), 2, "science"));
      questionRepository.save(new Question(null, "What is the hardest natural substance on Earth?",
          Arrays.asList("Gold", "Iron", "Diamond", "Quartz"), 2, "science"));
      questionRepository.save(new Question(null, "What is the chemical symbol for Silver?",
          Arrays.asList("Si", "Ag", "Sv", "Sr"), 1, "science"));
      questionRepository.save(new Question(null, "Which planet is known as the Red Planet?",
          Arrays.asList("Venus", "Mars", "Jupiter", "Saturn"), 1, "science"));
      questionRepository.save(new Question(null, "What is the largest organ of the human body?",
          Arrays.asList("Liver", "Brain", "Skin", "Heart"), 2, "science"));
      questionRepository.save(new Question(null, "What force keeps planets in orbit around the sun?",
          Arrays.asList("Electromagnetism", "Gravity", "Nuclear Force", "Centrifugal Force"), 1, "science"));
      questionRepository.save(new Question(null, "What is the speed of light?",
          Arrays.asList("300,000 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"), 0, "science"));
      questionRepository.save(new Question(null, "What is the main gas found in the air we breathe?",
          Arrays.asList("Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"), 1, "science"));
      questionRepository.save(new Question(null, "What is the boiling point of water?",
          Arrays.asList("100°C", "0°C", "50°C", "25°C"), 0, "science"));
      questionRepository.save(new Question(null, "What is the chemical formula for water?",
          Arrays.asList("H2O", "CO2", "O2", "H2"), 0, "science"));
      questionRepository.save(new Question(null, "What is the main component of the sun?",
          Arrays.asList("Oxygen", "Hydrogen", "Helium", "Carbon"), 1, "science"));
      questionRepository.save(new Question(null, "What is the smallest unit of life?",
          Arrays.asList("Atom", "Molecule", "Cell", "Organism"), 2, "science"));
      questionRepository.save(new Question(null, "What is the process by which plants make their own food?",
          Arrays.asList("Photosynthesis", "Respiration", "Digestion", "Fermentation"), 0, "science"));
      questionRepository.save(new Question(null, "What is the main organ of the circulatory system?",
          Arrays.asList("Liver", "Heart", "Lungs", "Kidneys"), 1, "science"));
      questionRepository.save(new Question(null, "What is the chemical symbol for Iron?",
          Arrays.asList("Fe", "Ir", "I", "In"), 0, "science"));
      questionRepository.save(new Question(null, "What planet is known for its rings?",
          Arrays.asList("Jupiter", "Saturn", "Uranus", "Neptune"), 1, "science"));
      questionRepository.save(new Question(null, "What is the chemical symbol for Gold?",
          Arrays.asList("Au", "Ag", "Pb", "Fe"), 0, "science"));
      questionRepository.save(new Question(null, "What is the powerhouse of the cell?",
          Arrays.asList("Nucleus", "Mitochondria", "Ribosome", "Chloroplast"), 1, "science"));
    }

    if (scoreRepository.count() == 0) {

      scoreRepository.save(new Score(null, "mario", "videogames", 850, new Date()));
      scoreRepository.save(new Score(null, "mario", "science", 720, new Date()));
      scoreRepository.save(new Score(null, "mario", "history", 650, new Date()));
      scoreRepository.save(new Score(null, "luigi", "videogames", 920, new Date()));
      scoreRepository.save(new Score(null, "luigi", "cinema", 780, new Date()));
      scoreRepository.save(new Score(null, "peach", "art", 890, new Date()));
      scoreRepository.save(new Score(null, "peach", "cinema", 810, new Date()));
      scoreRepository.save(new Score(null, "peach", "geography", 700, new Date()));
      scoreRepository.save(new Score(null, "bowser", "videogames", 750, new Date()));
      scoreRepository.save(new Score(null, "bowser", "history", 820, new Date()));
      scoreRepository.save(new Score(null, "yoshi", "science", 950, new Date()));
      scoreRepository.save(new Score(null, "yoshi", "geography", 880, new Date()));
      scoreRepository.save(new Score(null, "yoshi", "art", 760, new Date()));
      scoreRepository.save(new Score(null, "toad", "cinema", 690, new Date()));
      scoreRepository.save(new Score(null, "toad", "videogames", 620, new Date()));
      scoreRepository.save(new Score(null, "wario", "history", 840, new Date()));
      scoreRepository.save(new Score(null, "wario", "science", 710, new Date()));
      scoreRepository.save(new Score(null, "wario", "videogames", 670, new Date()));
      scoreRepository.save(new Score(null, "waluigi", "geography", 790, new Date()));
      scoreRepository.save(new Score(null, "waluigi", "cinema", 720, new Date()));
      scoreRepository.save(new Score(null, "daisy", "art", 860, new Date()));
      scoreRepository.save(new Score(null, "daisy", "science", 800, new Date()));
      scoreRepository.save(new Score(null, "daisy", "history", 750, new Date()));
      scoreRepository.save(new Score(null, "rosalina", "videogames", 990, new Date()));
      scoreRepository.save(new Score(null, "rosalina", "geography", 870, new Date()));
    }
  }
}
