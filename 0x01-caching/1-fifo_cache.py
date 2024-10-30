#!/usr/bin/env python3
""" 1. FIFO caching """


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ First In First Out Strategy """
    def __init__(self):
        """ This is the constructor """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cacke """
        if key is not None and item is not None:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                First_In = next(iter(self.cache_data))
                del self.cache_data[First_In]
                print("Discard: {}".format(First_In))

    def get(self, key):
        """ Get an item by key """
        return self.cache_data.keys()
