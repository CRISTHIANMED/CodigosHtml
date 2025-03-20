// Import required modules
import express from 'express'; // Framework to handle the web server
import { engine } from 'express-handlebars'; // Handlebars template engine
import { join, dirname } from 'path'; // Module to handle file paths
import { fileURLToPath } from 'url'; // Converts the file URL into a system path
import morgan from 'morgan'; // Middleware for logging HTTP requests

// Initialize the Express application
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); // Get the current directory of the file

// Server configuration
app.set('port', process.env.PORT || 3000); // Use the environment-defined port or default to 3000

// Template engine configuration
app.set("views", join(__dirname, "views")); // Set the folder for views

app.engine(".hbs", engine({ // Configure the Handlebars template engine
    defaultLayout: "main", // Define the main layout
    layoutDir: join(app.get("views"), "layouts"), // Folder for layout templates
    partialsDir: join(app.get("views"), "partials"), // Folder for reusable partial templates
    extname: ".hbs" // Set the file extension for Handlebars templates
}));

app.set("view engine", ".hbs"); // Set Handlebars as the view engine

// Middleware configuration
app.use(morgan('dev')); // Log incoming HTTP requests in the "dev" format
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data from forms
app.use(express.json()); // For file Json type

// Define application routes
app.get('/', (req, res) => {
    res.render("index")
    //res.json({ 'message': "Hello world, this is a bootcamp" }); // Send a JSON response
});

// Sets the path of the publics file
app.use(express.static(join(__dirname, "public")));

// Start the server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port')); // Log a message when the server is running
});

