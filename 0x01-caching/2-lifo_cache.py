#!/usr/bin/env python3
""" 2. LIFO caching """


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ Last In First Out Strategy """
    def __init__(self):
        """ This is the constructor """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cacke """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                Last_In, _ = self.cache_data.popitem()
                print("DISCARD: {}".format(Last_In))
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key """
        return self.cache_data.get(key)
