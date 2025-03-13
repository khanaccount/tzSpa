import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useSearch } from "hooks/useSearch";

const mockStore = configureStore({
  reducer: {
    posts: () => ({
      posts: [
        { id: 1, title: "Тестовый пост 1", body: "Тестовое содержание 1" },
        { id: 2, title: "Тестовый пост 2", body: "Тестовое содержание 2" },
        { id: 3, title: "Другой пост", body: "Содержание другого поста" },
      ],
      loading: false,
      error: null,
    }),
  },
});

describe("useSearch Hook", () => {
  test("filters posts based on search input", () => {
    const TestComponent = () => {
      const { searchTerm, searchResults, handleSearchChange } = useSearch();

      return (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <ul>
            {searchResults.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </>
      );
    };

    render(
      <Provider store={mockStore}>
        <TestComponent />
      </Provider>
    );

    // Вводим текст для поиска
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Тестовый" },
    });

    // Проверяем, что фильтрация сработала и отображаются только нужные посты
    expect(screen.getByText("Тестовый пост 1")).toBeInTheDocument();
    expect(screen.getByText("Тестовый пост 2")).toBeInTheDocument();
    expect(screen.queryByText("Другой пост")).not.toBeInTheDocument();

    // Вводим текст для поиска, который не соответствует ни одному посту
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Не существует" },
    });

    // Проверяем, что нет постов, соответствующих запросу
    expect(screen.queryByText("Тестовый пост 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Тестовый пост 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Другой пост")).not.toBeInTheDocument();
  });
});
