import os
import subprocess
import json
import hashlib
from shutil import copyfile

ephemeral_conv_filename = "DANGER_DO_NOT_RUN_ephemeral_converter.py"

cur_dir = os.path.dirname(os.path.realpath(__file__))
conv_inst_dir = os.path.realpath(os.path.join(cur_dir, "..", "converter-instance"))
conv_store_dir = os.path.join(conv_inst_dir, "converters")
conv_exec_file = os.path.join(conv_inst_dir, "bin", "run")
conv_root_dir = os.path.join(conv_inst_dir, "root")
conv_input_file = os.path.join(conv_root_dir, "input.json")

def run_conversion(conv_id, conv_data):
    
    with open(conv_input_file, "w+") as fi:
        fi.write(conv_data)
        fi.close()
        
    fetch_converter(conv_id, conv_root_dir)
    
    output = subprocess.check_output(conv_exec_file + " python " + ephemeral_conv_filename, shell=True).decode("ascii").rstrip()
    
    return output

def fetch_converter(conv_id, conv_root_dir):
    conv_repo_dir = os.path.realpath(os.path.join(conv_root_dir, "..", "converters")) # TODO: temporary, move the repo elsewhere
    
    conv_repo_file = os.path.join(conv_repo_dir, conv_id+".py")
    conv_module_file = os.path.join(conv_root_dir, ephemeral_conv_filename)
    
    if os.path.exists(conv_module_file):
        os.remove(conv_module_file)
        
    copyfile(conv_repo_file, conv_module_file)

def new_converter(logic):
    logic_hash = hashlib.sha256(logic.encode("utf-8")).hexdigest()
    logic_module_file = os.path.join(conv_store_dir, logic_hash + ".py")
    with open(logic_module_file, "w+") as fi:
        fi.write(logic)
        fi.close()
    return logic_hash