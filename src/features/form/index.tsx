import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const DishesForm: FC = () => {
  //   const handleTypeChange = (e) => {
  //     console.log(`Chosen dish`);
  //   };

  return (
    <form>
      <label htmlFor="dishName">Dish name</label>
      <input name="dishName" id="dishName" type="text" placeholder="dish name" />
      <br />
      <label htmlFor="dishName">Preperation time</label>
      <input name="prepTime" type="text" placeholder="prep time" />
      <label htmlFor="dishType">Dish type</label>
      <select id="dishType">
        <option selected disabled>
          Choose dish type
        </option>
        <option>Pizza</option>
        <option>Soup</option>
        <option>Sandwich</option>
      </select>
    </form>
  );
};
