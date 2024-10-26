#!/usr/bin/env python3
""" Simple helper function """


def index_range(page: int, page_size: int) -> tuple[int, int]:
    """ Simple helper function """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index
