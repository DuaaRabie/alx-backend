#!/usr/bin/env python3
"""
n-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """  Deletion-resilient hypermedia pagination """
        indexed_dataset = self.indexed_dataset()
        if index is not None:
            assert 0 <= index < len(indexed_dataset), "Index out of range"

        if index is None:
            start_index = 0
        else:
            start_index = index

        end_index = start_index + page_size

        data = []
        while len(data) < page_size and start_index < len(indexed_dataset):
            if start_index in indexed_dataset:
                data.append(indexed_dataset[start_index])
            start_index += 1

        next_index = start_index

        return {
            "index": start_index - len(data),
            "next_index": next_index,
            "page_size": page_size,
            "data": data,
        }
