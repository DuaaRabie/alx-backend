#!/usr/bin/env python3
""" 4. MRU caching """


from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ Most Recently used Strategy """

    def __init__(self):
        """ This is the constructor """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            """ be aware that we use pop so we do it first then add item
            due to this we set the condition to be >= not only > """
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                Last_In, _ = self.cache_data.popitem()
                print("DISCARD: {}".format(Last_In))
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            most_recently = self.cache_data[key]
            del self.cache_data[key]
            self.cache_data[key] = most_recently
        return self.cache_data.get(key)
