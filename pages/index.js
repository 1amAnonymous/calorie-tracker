import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AnimatedBeam from "@/components/animata/background/animated-beam";
import { set, useForm } from "react-hook-form";
import { getResp } from "@/helper/aiResponse";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDietData, setIsLoading } from "@/toolkit/slice/counterSlice";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, dietData } = useSelector((state) => state.Counter);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { gender, height, currentWeight, targetWeight, age } = data;
    console.log(gender, height, age, currentWeight, targetWeight);
    dispatch(setIsLoading(true));  // Set loading state
    getResp(gender, height, age, currentWeight, targetWeight).then((resp) => {
      console.log(resp);
      dispatch(setDietData(resp));
      dispatch(setIsLoading(false));  // Reset loading state after fetching data
    });
  };

  return (
    <>
      <AnimatedBeam className={"min-h-screen"}>
        <div className="flex min-h-screen items-center justify-center text-white">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Weight Loss Calculator</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="text-black">
              {/* Gender Section */}
              <fieldset className="mb-6">
                <legend className="text-lg font-medium mb-2">Gender</legend>
                <div className="flex items-center space-x-6">
                  <label htmlFor="male" className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      {...register("gender", { required: "Gender is required" })}
                      className="form-radio text-blue-500"
                    />
                    <span>Male</span>
                  </label>
                  <label htmlFor="female" className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      {...register("gender", { required: "Gender is required" })}
                      className="form-radio text-pink-500"
                    />
                    <span>Female</span>
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </fieldset>

              {/* Age Section */}
              <fieldset className="mb-6">
                <legend className="text-lg font-medium mb-2">Age</legend>
                <select
                  id="age"
                  {...register("age", { required: "Age is required" })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55-64">55-64</option>
                  <option value="65+">65+</option>
                </select>
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
              </fieldset>

              {/* Height Section */}
              <fieldset className="mb-6">
                <legend className="text-lg font-medium mb-2">Height (cm)</legend>
                <select
                  id="height"
                  {...register("height", { required: "Height is required" })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="150">150 cm</option>
                  <option value="155">155 cm</option>
                  <option value="160">160 cm</option>
                  <option value="165">165 cm</option>
                  <option value="170">170 cm</option>
                  <option value="175">175 cm</option>
                  <option value="180">180 cm</option>
                  <option value="185">185 cm</option>
                </select>
                {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
              </fieldset>

              {/* Current Weight Section */}
              <fieldset className="mb-6">
                <legend className="text-lg font-medium mb-2">Current Weight (kg)</legend>
                <input
                  type="number"
                  id="currentWeight"
                  placeholder="Enter your current weight"
                  {...register("currentWeight", {
                    required: "Current weight is required",
                    min: { value: 1, message: "Weight must be a positive number" },
                  })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.currentWeight && <p className="text-red-500 text-sm">{errors.currentWeight.message}</p>}
              </fieldset>

              {/* Target Weight Section */}
              <fieldset className="mb-6">
                <legend className="text-lg font-medium mb-2">Target Weight (kg)</legend>
                <input
                  type="number"
                  id="targetWeight"
                  placeholder="Enter your target weight"
                  {...register("targetWeight", {
                    required: "Target weight is required",
                    min: { value: 1, message: "Weight must be a positive number" },
                  })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.targetWeight && <p className="text-red-500 text-sm">{errors.targetWeight.message}</p>}
              </fieldset>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Calculate
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Skeleton Loader for Data */}
        {isLoading && (
          <div className="max-w-7xl mx-auto p-6 bg-white mb-12 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        )}

        {/* Display Diet and Exercise Plan */}
        {!isLoading && dietData && (
          <div className="max-w-7xl mx-auto p-6 bg-gray-100 mb-12 rounded-lg">
            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-blue-700">Weekly Diet & Exercise Plan</h1>
              <p className="text-lg mt-2">Calorie Target: <span className="font-bold text-green-600">{dietData.calori_target}</span> kcal/day</p>
            </header>

            {/* Diet Plan Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-blue-500">Diet Plan</h2>
                <p className="mt-4 text-gray-700">Follow the diet plan to maintain a healthy and balanced lifestyle.</p>
                <div className="mt-6">
                  {dietData.diet?.map((day, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      <h3 className="text-xl font-semibold text-blue-600">{day.day}</h3>
                      <div className="mt-2 text-gray-800">
                        <p><strong>Breakfast:</strong> {day.meals.breakfast}</p>
                        <p><strong>Lunch:</strong> {day.meals.lunch}</p>
                        <p><strong>Dinner:</strong> {day.meals.dinner}</p>
                        <p><strong>Snacks:</strong> {day.meals.snacks}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercise Plan Section */}
              <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-blue-500">Exercise Plan</h2>
                <p className="mt-4 text-gray-700">Stay active with a mix of cardio and strength training.</p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-blue-600">Cardio</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-800">
                    {dietData.exercise?.cardio.map((exercise, index) => (
                      <li key={index}><strong>{exercise.name}:</strong> {exercise.time}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-blue-600">Strength Training</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-800">
                    {dietData.exercise?.strength_training.map((exercise, index) => (
                      <li key={index}><strong>{exercise.name}:</strong> {exercise.time}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}
      </AnimatedBeam>
    </>
  );
}
