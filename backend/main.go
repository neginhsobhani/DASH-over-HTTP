package main

import (
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"strconv"
)
import "github.com/gofiber/fiber/v2"

type Movie struct {
	gorm.Model
	Title       string  `json:"title"`
	Director    string  `json:"director"`
	Rate        float64 `json:"rate"`
	Description string  `json:"description"`
	TrailerPath string  `json:"trailer_path"`
	ImageURL    string  `json:"imageUrl"`
}

var db *gorm.DB

func main() {
	var err error

	db, err = gorm.Open(sqlite.Open("an.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	InitDB()

	app := fiber.New()

	// Default config
	app.Use(cors.New())

	app.Get("/api/movies", GetAllMovies)
	app.Get("/api/movies/:id", GetMovie)

	if err = app.Listen(":8000"); err != nil {
		panic(err)
	}
}

func InitDB() {
	err := db.Migrator().DropTable(&Movie{})
	if err != nil {
		panic(err)
	}

	err = db.Migrator().AutoMigrate(&Movie{})
	if err != nil {
		panic(err)
	}

	movies := []Movie{
		{
			Title:       "The Shawshank Redemption",
			Director:    "Ye Korre Khar",
			Rate:        9.3,
			Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
			TrailerPath: "/media/dash/shawshank/dash.mpd",
		},
		{
			Title:       "The Godfather",
			Director:    "Francis Ford Coppola",
			Rate:        9.2,
			Description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
			TrailerPath: "https://fuck-mm.arvanvod.com/5MX06QZzpn/W1L0rKEN5r/h_,144_200,240_400,360_800,480_1346,k.mp4.list/manifest.mpd",
		},
		{
			Title:       "The Dark Knight",
			Director:    "Christopher Nolan",
			Rate:        9.0,
			Description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
			TrailerPath: "https://fuck-mm.arvanvod.com/5MX06QZzpn/XVEa0NwlRj/h_,144_200,240_400,360_800,480_1469,k.mp4.list/manifest.mpd",
		},
		{
			Title:       "The Godfather Part II",
			Director:    "Francis Ford Coppola",
			Rate:        9.0,
			Description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
			TrailerPath: "https://fuck-mm.arvanvod.com/5MX06QZzpn/e4bpz9wJZW/h_,144_200,240_400,360_800,480_1500,k.mp4.list/master.m3u8",
		},
		{
			Title:       "12 Angry Men",
			Director:    "Sidney Lumet",
			Rate:        9.0,
			Description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_FMjpg_UX1000_.jpg",
			TrailerPath: "https://fuck-mm.arvanvod.com/5MX06QZzpn/yAv75ZYJWM/h_,144_200,240_400,360_800,480_1500,k.mp4.list/master.m3u8",
		},
		{
			Title:       "Schindler's List",
			Director:    "Steven Spielberg",
			Rate:        9.0,
			Description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
			TrailerPath: "/media/dash/schindler/dash.mpd",
		},
	}

	err = db.Create(&movies).Error
	if err != nil {
		panic(err)
	}
}

func GetAllMovies(c *fiber.Ctx) error {
	var movies []Movie

	err := db.Find(&movies).Error
	if err != nil {
		return c.Status(500).SendString("ridi: " + err.Error())
	}

	return c.Status(200).JSON(movies)
}

func GetMovie(c *fiber.Ctx) error {
	idString := c.Params("id", "")

	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		return c.Status(400).SendString(err.Error())
	}

	var movie Movie

	err = db.Where("id = ?", id).Find(&movie).Error
	if err != nil {
		return c.Status(500).SendString("ridi: " + err.Error())
	}

	return c.Status(200).JSON(movie)
}
