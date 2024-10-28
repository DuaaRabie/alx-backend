#!/usr/bin/env python3
""" Simple helper function """


import csv
import math
from typing import List, Tuple, Dict, Union, Optional


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ Simple helper function """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Simple pagination """
        dataset = self.dataset()
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        start, end = index_range(page, page_size)
        if start >= len(dataset) or end <= 0:
            return []
        return dataset[start: end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> \
            Dict[str, Union[int, List[list], Optional[int]]]:
        """ Hypermedia pagination """
        paginated_data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.__dataset) / page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None
        page_size = page_size if page <= total_pages else 0
        
        return {
            "page_size": page_size,
            "page": page,
            "data": paginated_data,
            "next_page": next_page,
            "prev_page": prev_page,
            "tatal_pages": total_pages
            }
