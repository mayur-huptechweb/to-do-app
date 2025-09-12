import "dotenv/config.js";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
