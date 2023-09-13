import React, { useEffect, useState } from "react";

import Todolist from "./todolist";




//create your first component
const Home = () => {
	return (
		<div>
			<h1 className="header">To do list</h1>
			<Todolist/>
		</div>
	);
};





export default Home;