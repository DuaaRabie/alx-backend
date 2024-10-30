#!/usr/bin/env python3
""" 0. Basic dictionary """


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ Basic dictionary without limit """
    def __init__(self):
        """ This is the constructor """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cach """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key """
        return self.cache_data.get(key)
