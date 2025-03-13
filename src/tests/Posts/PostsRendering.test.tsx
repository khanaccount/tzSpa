import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { Posts } from "components/Posts";
import { vi } from "vitest";

global.matchMedia = vi.fn().mockImplementation(() => ({
  matches: false,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));

// Моки для хуков
vi.mock("hooks/useFetchData", () => ({
  useFetchData: vi.fn(() => ({
    data: [{ id: 1, title: "Тестовый пост 1", body: "Тестовое содержание 1" }],
    loading: false,
    error: null,
  })),
}));

vi.mock("hooks/usePagination", () => ({
  usePagination: vi.fn(() => ({
    currentPage: 1,
    goToPage: vi.fn(),
    paginatedItems: (items: any[]) => items,
    totalPages: 1,
  })),
}));

vi.mock("hooks/useEntityActions", () => ({
  useEntityActions: vi.fn(() => ({
    editingEntity: null,
    setEditingEntity: vi.fn(),
    isModalVisible: false,
    setModalVisible: vi.fn(),
    handleEditClick: vi.fn(),
    handleEditEntity: vi.fn(),
    handleDeleteClick: vi.fn(),
  })),
}));

describe("Posts Component", () => {
  test("renders the list of posts", () => {
    const mockStore = configureStore({
      reducer: {
        posts: () => ({
          posts: [{ id: 1, title: "Тестовый пост 1", body: "Тестовое содержание 1" }],
          loading: false,
          error: null,
        }),
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Список постов/i)).toBeInTheDocument();
    expect(screen.getByText(/Тестовый пост 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Тестовое содержание 1/i)).toBeInTheDocument();
  });
});
