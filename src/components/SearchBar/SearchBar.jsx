
import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SearchBar = ({onChange}) => {

  // const handleMouseEnter = () => {
  //   setIsDropDownVisible(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsDropDownVisible(false);
  // };

  // const handleClickOutside = (event) => {
  //   if (!event.target.closest(".data-result")) {
  //     setIsDropDownVisible(false);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit();
  // };
  // handleChange will change every time text is entered in the search bar
  // const handleChange = (e) => {
  //   onQueryChange(e.target.value);
  // };

  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);
  //
  // const handleCharacterSelect = (name) => {
  //   navigate(`/${searchType}detail/${name}`, {
  //     state: { prevQuery: query },
  //   });
  // };

  return (
    <div className="search-bar-container">
      <input type="search" placeholder="Search By Title..." onChange={onChange}/>
    </div>
  );
};