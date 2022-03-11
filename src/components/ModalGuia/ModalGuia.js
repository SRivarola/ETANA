import React from 'react'
import './ModalGuia.scss'

export default function ModalGuia() {
  return (
    <div className="modal fade" id="modalGuia" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog ">
        <div className="modal-content mod-guia">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Guia de talles</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <table className='Cart__products-list'>
                    <thead>
                        <tr>
                            <th>TALLES</th>
                            <th>36</th>
                            <th>37</th>
                            <th>38</th>
                            <th>39</th>
                            <th>40</th>
                            <th>41</th>
                            <th>42</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>CM</th>
                            <th>23,5</th>
                            <th>24</th>
                            <th>24,5</th>
                            <th>25</th>
                            <th>26</th>
                            <th>27</th>
                            <th>27,5</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
  )
}
