import { Heading } from "./components/Heading";

import MyCalendar from "./components/Calendar";
import NewsYouTube from "./components/NewsYouTube";
import { SearchBar } from "./components/SearchBar";
import WeatherCardList from "./components/WeaterhCardList";

function App() {
  return (
    <div className="mx-auto max-w-xl px-6 py-8 md:px-6 lg:max-w-6xl lg:px-12">
      <Heading />
      <SearchBar />
      <div className="mt-12 lg:grid lg:grid-cols-3 lg:px-8">
        <WeatherCardList />
        <MyCalendar />
      </div>
      <NewsYouTube />
    </div>
  );
}

export default App;
